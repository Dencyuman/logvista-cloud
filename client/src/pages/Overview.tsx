// --- Do not remove this imports!
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
// ---

import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import { overviewLayout, SystemService } from '../service/SystemService';
import { OverviewData, OverviewChart } from '../components/charts/OverviewChart';


interface System {
    id: string;
    name: string;
    latestTimestamp: Date;
    status: string;
    category?: string;
    data: OverviewData[];
}

export default function Overview() {
    const navigate = useNavigate();
    const [systems, setSystems] = useState<System[]>([]);

    useEffect(() => {
        SystemService.getSystems().then((data) => {
            const systemsWithDefaults = data.slice(0, 18).map(system => ({
                ...system,
                latestTimestamp: system.latestTimestamp ?? new Date()
            }));
            setSystems(systemsWithDefaults);
        });
    }, []);

    const redirectToDashboard = () => {
        navigate('/dashboard');
    };

    const getSeverity = (system: System) => {
        switch (system.status) {
            case 'NORMAL':
                return 'success';

            case 'WARNING':
                return 'warning';

            case 'ERRORED':
                return 'danger';

            default:
                return null;
        }
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(date);
    };

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('ja-JP', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(date);
    };

    const timeAgo = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.round(diffMs / 60000);
        const diffHrs = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHrs / 24);

        if (diffMins < 60) {
            return `${diffMins}分前`;
        } else if (diffHrs < 24) {
            return `${diffHrs}時間前`;
        } else if (diffDays < 30) {
            return `${diffDays}日前`;
        } else {
            return '30日以上前';
        }
    };

    const gridItem = (system: System) => {
        return (
            <div className="col-12 py-3 sm:px-3 lg:col-6 xl:col-4">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{system.category || 'Others'}</span>
                        </div>
                        <Tag value={system.status} severity={getSeverity(system)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 pt-5 pb-2">
                        <div className="text-2xl font-bold w-full">{system.name}</div>
                        <OverviewChart data={system.data} layout={overviewLayout} />
                        <div className="w-full">
                            <h4 className="m-0 p-0 font-bold">最新取得ログ</h4>
                            <div className="text-base flex flex-wrap:wrap gap-2 align-items-baseline">
                                <div>{formatDate(system.latestTimestamp)}</div>
                                <div>{formatTime(system.latestTimestamp)}</div>
                                <div>({timeAgo(system.latestTimestamp)})</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex align-items-center justify-content-between flex-row-reverse">
                        <Button className="myButton" icon="pi pi-chart-bar" rounded onClick={redirectToDashboard}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (system: System) => {
        if (!system) {
            return;
        }

        return gridItem(system);
    };


    return (
        <div className="card">
            <h1 className="my-3 sm:px-3">System Overview</h1>
            <Tooltip target=".myButton" content="Jump to DashBoard." position="left"/>
            <DataView value={systems} itemTemplate={itemTemplate} layout={'grid'}/>
        </div>
    )
}
