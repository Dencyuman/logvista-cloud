// --- Do not remove this imports!
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
// ---

import React from 'react';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SchemasSummary } from '../../ApiClient';
// import { Tag } from 'primereact/tag';

type LogDetailDialogProps = {
    title: string;
    summary: SchemasSummary;
    visible: boolean;
    onHide: () => void;
};

export default function LogDetailDialog({ title, summary, visible, onHide }: LogDetailDialogProps) {
    const latestLog = summary.latest_log;
    // const getSeverity = (summary: SchemasSummary) => {
    //     switch (summary.latest_log.level_name) {
    //         case 'INFO':
    //             return 'success';
    //             case 'WARNING':
    //                 return 'warning';
    //         case 'ERROR':
    //             return 'danger';
    //         default:
    //             return null;
    //     }
    // };
    // const convertLevelNameToStatus = (levelName: string) => {
    //     switch (levelName) {
    //         case 'INFO':
    //             return 'NORMAL';
    //         case 'WARNING':
    //             return 'WARNING';
    //         case 'ERROR':
    //             return 'ERRORED';
    //         default:
    //             return null;
    //     }
    // };
    // const levelNameTemplate = (summary: SchemasSummary) => {
    //     return <Tag value={convertLevelNameToStatus(summary.latest_log.level_name)} severity={getSeverity(summary)}></Tag>;
    // };

    return (
        <Dialog header={title} visible={visible} style={{ width: '70vw' }} onHide={onHide} modal>
            <div className="inline-flex py-1 px-2 align-items-center gap-2 border-round-sm surface-100">
                <i className="pi pi-tag"></i>
                <span className="font-semibold">{summary.category}</span>
            </div>
            <h2 className="m-0 py-3 px-4">{summary.name}</h2>

            <DataTable className="mb-4" header="基本データ" value={[latestLog]}>
                <Column field="level_name" header="Level" />
                <Column field="message" header="Message" />
                <Column field="file_name" header="File" />
                <Column field="func_name" header="Function" />
                <Column field="lineno" header="LineNo" body />
                <Column field="module" header="Module" />
                <Column field="name" header="Name" />
                <Column field="timestamp" header="Timestamp" />
            </DataTable>

            <DataTable className="mb-4" header="詳細データ" value={[latestLog]}>
                <Column field="exc_type" header="Exception Type" />
                <Column field="exc_value" header="Exception Value" />
                <Column field="exc_detail" header="Exception Detail" />
            </DataTable>

            <DataTable header="オプションデータ" value={[latestLog]}>
                <Column field="cpu_percent" header="CPU %" />
                <Column field="process" header="Process" />
                <Column field="process_name" header="Process Name" />
                <Column field="thread" header="Thread" />
                <Column field="thread_name" header="Thread Name" />
                <Column field="total_memory" header="Total Memory" />
                <Column field="available_memory" header="Available Memory" />
                <Column field="memory_percent" header="Memory %" />
                <Column field="used_memory" header="Used Memory" />
                <Column field="free_memory" header="Free Memory" />
                <Column field="cpu_user_time" header="CPU User Time" />
                <Column field="cpu_system_time" header="CPU System Time" />
                <Column field="cpu_idle_time" header="CPU Idle Time" />
                <Column field="levelno" header="Level Number" />
                <Column field="system_name" header="System Name" />
            </DataTable>
        </Dialog>
    );
}
