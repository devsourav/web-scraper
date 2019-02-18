import { Routes } from '@angular/router';

export const BASE_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'site-url',
        pathMatch: 'full',
    },
    {
        path: 'site-url',
        loadChildren: '../pages/site-url/site-url.module#SiteUrlModule'
    },
    {
        path: 'spreadsheet',
        loadChildren: '../pages/spreadsheet/spreadsheet.module#SpreadsheetModule'
    },
    {
        path: 'settings',
        loadChildren: '../pages/settings/settings.module#SettingsModule'
    },
    {
        path: 'picker-sets',
        loadChildren: '../pages/picker-sets/picker-sets.module#PickerSetsModule'
    }
];
