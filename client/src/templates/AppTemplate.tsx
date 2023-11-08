// --- Do not remove this imports!
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
// ---

import { SetStateAction, useState } from 'react';

import Sidescreen from '../components/Sidescreen';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

export type Page = {
    name: string;
    path: string;
    iconClassName: string;
}

export type AppContextType = {
    handlePageChange: (page: Page) => void;
};

export default function AppTemplate() {
    const [visible, setVisible] = useState(false);
    const handlePageChange = (page: SetStateAction<{ name: string; path: string; iconClassName: string; }>) => {
        setSelectedPage(page);
      };
    const pages = [
        { name: 'Home', path: '/', iconClassName: 'pi pi-home' },
        { name: 'Overview', path: '/overview', iconClassName: 'pi pi-th-large'},
        { name: 'DashBoard', path: '/dashboard', iconClassName: 'pi pi-chart-bar' },
        { name: 'Report', path: '/report', iconClassName: 'pi pi-chart-pie' },
        { name: 'Settings', path: '/settings', iconClassName: 'pi pi-cog' },
    ];
    const [selectedPage, setSelectedPage] = useState(pages[0]);
    // const imageLink: string = "https://primefaces.org/cdn/primereact/images/organization/walter.jpg";
    const imageLink: undefined = undefined;

    return (
        <div className="card grid ">
            <div className="col-12">
                <Sidescreen visible={visible} setVisible={setVisible} selectedPage={selectedPage} setSelectedPage={setSelectedPage} pages={pages}/>
                <Header selectedPage={selectedPage} setVisible={setVisible} imageLink={imageLink ? imageLink : undefined}/>
                <div className="px-6 m-auto container">
                    <Outlet context={{ handlePageChange }}/>
                </div>
            </div>
        </div>
    )
}