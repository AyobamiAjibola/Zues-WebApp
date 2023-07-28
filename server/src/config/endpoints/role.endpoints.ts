import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoints = appCommonTypes.RouteEndpoints;
import { createRole } from '../../routes/roleRoute';

const roleEndpoints: RouteEndpoints = [
    {
        name: 'role',
        method: 'post',
        path: '/role',
        handler: createRole
    }
];

export default roleEndpoints;