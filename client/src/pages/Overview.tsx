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
import { useNavigate, useOutletContext } from 'react-router-dom';
import { overviewLayout } from '../service/SystemService';
import { OverviewData, OverviewChart } from '../components/charts/OverviewChart';
import apiClient, { SchemasSummary, SchemasSummaryData } from '../ApiClient'
import { AppContextType } from '../templates/AppTemplate';
import { SkeletonGridItem } from '../components/overview/Skelton';
import CategoryTag from '../components/overview/CategoryTag';


export default function Overview() {
    const navigate = useNavigate();
    // const [systems, setSystems] = useState<System[]>([]);
    const [summary, setSummary] = useState<SchemasSummary[]>([]);

    const refreshSummary = async () => {
        try {
            const res = await apiClient.systemsSummaryGet();
            setSummary(res.data);
        } catch (error) {
            console.error("Error fetching summary: ", error);
        }
    };

    function formatBaseTime(date: Date): string {
        return new Intl.DateTimeFormat('ja-JP', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    }

    function convertToOverviewData(schemasData: SchemasSummaryData[]): OverviewData[] {
        return schemasData.map((data) => ({
            name: formatBaseTime(new Date(data.base_time))+"~",
            INFO: data.infolog_count,
            WARNING: data.warninglog_count,
            ERROR: data.errorlog_count
        }));
    }

    const fetchData = async () => {
        try {
            const res = await apiClient.systemsSummaryGet();
            setSummary(res.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        // スケルトン用のダミーデータをセット
        const skeletonData = Array(6).fill(null); // 6は表示したいスケルトンの数
        setSummary(skeletonData);

        // 実際のデータをフェッチする関数を定義
        const fetchAndSetData = async () => {
            try {
                await fetchData(); // fetchData 内で setSummary が呼ばれると想定
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        // 初回のデータフェッチを実行
        fetchAndSetData();
        // 5秒ごとにデータを更新するためのインターバルを設定
        const interval = setInterval(fetchAndSetData, 5000);
        // 1分後にデータのリアルタイム更新を停止するタイマーを設定
        const timer = setTimeout(() => {
            clearInterval(interval);
        }, 120000); // 1分 = 120000ミリ秒
        // コンポーネントのアンマウント時にインターバルとタイマーをクリア
        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    const { handlePageChange } = useOutletContext<AppContextType>();
    const redirectToDashboard = () => {
        const dashboardPage = {
            name: 'DashBoard',
            path: '/dashboard',
            iconClassName: 'pi pi-chart-bar'
        };
        handlePageChange(dashboardPage);
        navigate('/dashboard');
    };

    const getSeverity = (summary: SchemasSummary) => {
        switch (summary.latest_log.level_name) {
            case 'INFO':
                return 'success';
            case 'WARNING':
                return 'warning';
            case 'ERROR':
                return 'danger';
            default:
                return null;
        }
    };

    const convertLevelNameToStatus = (levelName: string) => {
        switch (levelName) {
            case 'INFO':
                return 'NORMAL';
            case 'WARNING':
                return 'WARNING';
            case 'ERROR':
                return 'ERRORED';
            default:
                return null;
        }
    }

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

    const gridItem = (summary: SchemasSummary) => {
        // 各ボタンに一意のクラス名を生成
        const buttonClassName = `goToDashboardButton-${summary.id}`;

        return (
            <div className="col-12 py-3 sm:px-3 lg:col-6 xl:col-4">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <CategoryTag summary={summary} onCategoryChange={refreshSummary}/>
                        <Tag value={convertLevelNameToStatus(summary.latest_log.level_name)} severity={getSeverity(summary)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 pt-5 pb-2">
                        <div className="text-2xl font-bold w-full">{summary.name}</div>
                        <OverviewChart data={convertToOverviewData(summary.data)} layout={overviewLayout} />
                    </div>
                    <div className="flex align-items-center justify-content-between flex-row">
                        <div className="w-10 p-2 border-round-sm cursor-pointer hover:surface-100">
                            <h4 className="m-0 p-0 font-bold">最新取得ログ</h4>
                            <div className="text-base flex flex-wrap items-baseline">
                                <div className="mr-2">{formatDate(new Date(summary.latest_log.timestamp))}</div>
                                <div className="mr-2">{formatTime(new Date(summary.latest_log.timestamp))}</div>
                                <div className="mr-2">({timeAgo(new Date(summary.latest_log.timestamp))})</div>
                            </div>
                        </div>
                        <Button className={buttonClassName} icon="pi pi-chart-bar" onClick={redirectToDashboard} rounded text severity="secondary"></Button>
                        <Tooltip target={`.${buttonClassName}`} content="Jump to DashBoard." position="left"/>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (summary: SchemasSummary | null) => {
        if (!summary) {
        return <SkeletonGridItem />;
        }

        // データがある場合は通常のアイテム表示を行う
        return gridItem(summary);
    };


    return (
        <div className="card">
            <h1 className="sm:px-3">System Overview</h1>
            <Tooltip target=".goToDashBoardButton" content="Jump to DashBoard." position="left"/>
            <DataView value={summary} itemTemplate={itemTemplate} layout={'grid'}/>
        </div>
    )
}
