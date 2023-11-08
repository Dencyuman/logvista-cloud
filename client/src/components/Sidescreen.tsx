// --- Do not remove this imports!
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
// ---

import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { ListBox } from 'primereact/listbox';

import { Page } from '../templates/AppTemplate';

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
        if (location.pathname !== selectedPage.path) {
            setSelectedPage(selectedPage);
            navigate(selectedPage?.path);
        }
        setVisible(false);
    }

    return (
        <Sidebar className="p-0" visible={visible} onHide={() => setVisible(false)}>
            <h2>Logvista</h2>
            <ListBox value={selectedPage} options={pages} onChange={onListBoxChange} itemTemplate={countryTemplate} optionLabel="name" className="w-full border-none" />
        </Sidebar>
    )
}
