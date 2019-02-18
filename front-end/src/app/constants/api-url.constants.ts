export const ApiUrlConstants = {
    EXCEL_LISTS: 'excel/list',
    EXCEL_UPLOAD: 'excel/upload',
    SAMPLE_URL: 'picker/process',
    SAMPLE_FILE: 'sample/upload',
    SAMPLE_FILE_DOWNLOAD: 'sample/download',
    SCREENSHOT: 'api/screenshot',
    PICKER_SAVE: 'picker/add'
}

export const Api_url = {
    SAMPLE: 'sample',
    EXCEL: 'excel',
    PICKER: 'picker'
}

// API url for picker_set
export const picker_url = {
    PICKER_VIEW: '/view',
    PICKER_ADD: '/add',
    PICKER_DELETE: '/delete',
    PICKER_UPDATE: '/update',
    PICKER_LIST: '/list'
}

// API url for excel
export const Excel_API = {
    EXCEL_LIST: '/list',
    EXCEL_DELETE: '/delete',
    EXCEL_UPLOAD: '/upload',
    Excel_PROCESS: '/process',
    EXCEL_DOWNLOAD: '/download'
}

export const excel_link = (excel_api: string, isReal?: boolean) => {
    if (isReal) {
        return 'excel' + excel_api;
    } else {
        return 'sample' + excel_api;
    }
}