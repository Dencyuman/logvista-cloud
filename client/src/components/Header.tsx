// --- Do not remove this imports!
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
// ---

import { Button } from 'primereact/button';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Page } from '../templates/AppTemplate';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { useEffect, useState } from 'react';

type BreadcrumbItem = {
    label: string;
    command?: () => void;
};

type HeaderProps = {
    selectedPage: Page;
    setVisible: (value: boolean) => void;
    imageLink?: string;
};

export default function Header({ selectedPage, setVisible, imageLink }: HeaderProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);

    useEffect(() => {
        // パスが変わるたびにブレッドクラムを更新する
        setBreadcrumbItems([
            {
                label: selectedPage.name,
                command: () => {
                    navigate(selectedPage.path);
                }
            }
        ]);
    }, [location, selectedPage, navigate]);

    const home = {
        icon: 'pi pi-home',
        command: () => {
            navigate('/');
        }
    };

    return (
        <div className="flex justify-content-between">
            <div className="flex align-items-center">
                <Button icon="pi pi-bars" text rounded severity="secondary" aria-label="ナビゲーションメニュー" onClick={() => setVisible(true)}/>
                <BreadCrumb model={breadcrumbItems} home={home} style={{border: 'none'}}/>
            </div>
            <div className="flex align-items-center">
                <Button icon="pi pi-search" text rounded className="p-button-rounded p-button-secondary" aria-label="検索" />
                <Button icon="pi pi-bell" text rounded className="p-button-rounded p-button-secondary" aria-label="通知" />
                <div className='pl-2 pr-3 cursor-pointer'>
                    {imageLink ? (
                        <Avatar image={imageLink} shape="circle" />
                    ) : (
                        <Avatar icon="pi pi-user" shape="circle" />
                    )}
                </div>
            </div>
        </div>
    )
}
