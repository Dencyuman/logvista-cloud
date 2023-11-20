// --- Do not remove this imports!
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
// ---

import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { ListBox } from 'primereact/listbox';

import { Page } from '../templates/AppTemplate';
import { useEffect } from 'react';

interface SidescreenProps{
    visible: boolean;
    setVisible: (value: boolean) => void;
    selectedPage: Page;
    setSelectedPage: (value: Page) => void;
    pages: Page[];
}

export default function Sidescreen({visible, setVisible, selectedPage, setSelectedPage, pages}: SidescreenProps) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        const matchingPage = pages.find(page => page.path === currentPath);
        if (matchingPage) {
            setSelectedPage(matchingPage);
        }
    }, [location, pages, setSelectedPage]);

    const countryTemplate = (option: Page) => {
        return (
            <div className="flex gap-4 align-items-center">
                <i className={option.iconClassName ? option.iconClassName : "pi pi-check-circle"} style={{ fontSize: '1rem' }}></i>
                <div>{option.name}</div>
            </div>
        );
    };

    const onListBoxChange = (e: { value: Page }) => {
        handleSelectionChange(e.value);
    };

    const handleSelectionChange = (selectedPage: Page) => {
        // 同じページが選択された場合は遷移しない
        console.log(location.pathname, selectedPage.path);
        if (location.pathname !== selectedPage.path) {
            setSelectedPage(selectedPage);
            navigate(selectedPage?.path);
        }
        setVisible(false);
    }

    return (
        <Sidebar className="p-0" visible={visible} onHide={() => setVisible(false)}>
            <img alt="logo" src="https://raw.githubusercontent.com/Dencyuman/logvista-cloud/main/client/src/assets/logo-with-name.png" className="w-full px-6 mb-4"></img>
            <ListBox value={selectedPage} options={pages} onChange={onListBoxChange} itemTemplate={countryTemplate} optionLabel="name" className="w-full border-none" />
        </Sidebar>
    )
}
