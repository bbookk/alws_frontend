'use strict';
var Base64 = require('js-base64').Base64;
var convert = require('xml-js');
module.exports.getUserInfoByIds = function (samlRes) {
    // let saml = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHNhbWwycDpSZXNwb25zZSBEZXN0aW5hdGlvbj0iaHR0cHM6Ly8xMC4xMzcuMTYuMTE4L2luZGV4Lmh0bWwiIElEPSJhb2dnbGJianBiYWJnaWxlYWFvcGdnb2pha3BiY2xvbWZramViYWlvIiBJblJlc3BvbnNlVG89Il84MzMwOTE2ZWU5MDBiNGUwZWQ1YiIgSXNzdWVJbnN0YW50PSIyMDE4LTA2LTA1VDA2OjU2OjQ5LjkzMVoiIFZlcnNpb249IjIuMCIgeG1sbnM6c2FtbDJwPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6cHJvdG9jb2wiIHhtbG5zOnhzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSI+PHNhbWwyOklzc3VlciBGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpuYW1laWQtZm9ybWF0OmVudGl0eSIgeG1sbnM6c2FtbDI9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPnRlc3QtaWRzLmFpcy5jby50aDwvc2FtbDI6SXNzdWVyPjxkczpTaWduYXR1cmUgeG1sbnM6ZHM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyMiPjxkczpTaWduZWRJbmZvPjxkczpDYW5vbmljYWxpemF0aW9uTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+PGRzOlNpZ25hdHVyZU1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNyc2Etc2hhMSIvPjxkczpSZWZlcmVuY2UgVVJJPSIjYW9nZ2xiYmpwYmFiZ2lsZWFhb3BnZ29qYWtwYmNsb21ma2plYmFpbyI+PGRzOlRyYW5zZm9ybXM+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNlbnZlbG9wZWQtc2lnbmF0dXJlIi8+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyI+PGVjOkluY2x1c2l2ZU5hbWVzcGFjZXMgUHJlZml4TGlzdD0ieHMiIHhtbG5zOmVjPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biMiLz48L2RzOlRyYW5zZm9ybT48L2RzOlRyYW5zZm9ybXM+PGRzOkRpZ2VzdE1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNzaGExIi8+PGRzOkRpZ2VzdFZhbHVlPjJzZUJ6aGMwWFdFUmszT25YVDQyQUo5ejNXaz08L2RzOkRpZ2VzdFZhbHVlPjwvZHM6UmVmZXJlbmNlPjwvZHM6U2lnbmVkSW5mbz48ZHM6U2lnbmF0dXJlVmFsdWU+UU9Xelk5ZU5YNEExVGZLN2p4eHJRclhGbFJJaFVobTJRT3BYVlFtNEJlVlhKRFFxZVdLU1Y0MlJreFVKSDEydm5zRStYRlo0Z3B6UENLL1ovcXkwNFZQbW9KM1crTWdUbnV5UjYxR2ZKeXhQc0lZSzZYWFFZVzdlalpDbjI2TnlSZDlPVGdLZ3V3VWJsR2I5NmU3clhTMzNzZnluMjZZbGtVdzFMTnFPZEdBPTwvZHM6U2lnbmF0dXJlVmFsdWU+PGRzOktleUluZm8+PGRzOlg1MDlEYXRhPjxkczpYNTA5Q2VydGlmaWNhdGU+TUlJQ05UQ0NBWjZnQXdJQkFnSUVTMzQzZ2pBTkJna3Foa2lHOXcwQkFRVUZBREJWTVFzd0NRWURWUVFHRXdKVlV6RUxNQWtHQTFVRUNBd0NRMEV4RmpBVUJnTlZCQWNNRFUxdmRXNTBZV2x1SUZacFpYY3hEVEFMQmdOVkJBb01CRmRUVHpJeEVqQVFCZ05WQkFNTUNXeHZZMkZzYUc5emREQWVGdzB4TURBeU1Ua3dOekF5TWpaYUZ3MHpOVEF5TVRNd056QXlNalphTUZVeEN6QUpCZ05WQkFZVEFsVlRNUXN3Q1FZRFZRUUlEQUpEUVRFV01CUUdBMVVFQnd3TlRXOTFiblJoYVc0Z1ZtbGxkekVOTUFzR0ExVUVDZ3dFVjFOUE1qRVNNQkFHQTFVRUF3d0piRzlqWVd4b2IzTjBNSUdmTUEwR0NTcUdTSWIzRFFFQkFRVUFBNEdOQURDQmlRS0JnUUNVcC9vVjF2V2M4L1RrUVNpQXZUb3VzTXpPTTRhc0IyaWx0cjJRS296bmk1YVZGdTgxOE1wT0xaSXI4TE1uVHpXbGxKdnZhQTVSQUFkcGJFQ2IrNDhGamJCZTBoc2VVZE41SHB3dm5IL0RXOFpjY0d2azUzSTZPcnE3aExDdjFaSHR1T0Nva2doei9BVHJoeVBxK1FrdE1mWG5SUzRIcktHSlR6eGFDY1U3T1FJREFRQUJveEl3RURBT0JnTlZIUThCQWY4RUJBTUNCUEF3RFFZSktvWklodmNOQVFFRkJRQURnWUVBVzV3UFI3Y3IxTEFkcStJclI0NGlRbFJHNUlUQ1pYWTloSTBQeWdMUDJySEFOaCtQWWZUbXhidU9ueWtOR3loTTZGakZMYlcydVpIUVRZMWpNclBwcmpPcm15SzVzakpSTzRkMURlR0hUL1luSWpzOUpvZ1JLdjRYSEVDd0x0SVZkQWJJZFdIRXRWWkp5TVNrdGN5eXNGY3Z1aFBRSzhRYy9FL1dxOHVIU0NvPTwvZHM6WDUwOUNlcnRpZmljYXRlPjwvZHM6WDUwOURhdGE+PC9kczpLZXlJbmZvPjwvZHM6U2lnbmF0dXJlPjxzYW1sMnA6U3RhdHVzPjxzYW1sMnA6U3RhdHVzQ29kZSBWYWx1ZT0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnN0YXR1czpTdWNjZXNzIi8+PC9zYW1sMnA6U3RhdHVzPjxzYW1sMjpBc3NlcnRpb24gSUQ9ImJmZm5vZmpmaWtlZ29sbmtnb3BjZmFtbXBkaGphaGhwYW9qbGFmZGgiIElzc3VlSW5zdGFudD0iMjAxOC0wNi0wNVQwNjo1Njo0OS45MzJaIiBWZXJzaW9uPSIyLjAiIHhtbG5zOnNhbWwyPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIiB4bWxuczp4cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEiPjxzYW1sMjpJc3N1ZXIgRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6bmFtZWlkLWZvcm1hdDplbnRpdHkiPnRlc3QtaWRzLmFpcy5jby50aDwvc2FtbDI6SXNzdWVyPjxkczpTaWduYXR1cmUgeG1sbnM6ZHM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyMiPjxkczpTaWduZWRJbmZvPjxkczpDYW5vbmljYWxpemF0aW9uTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+PGRzOlNpZ25hdHVyZU1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNyc2Etc2hhMSIvPjxkczpSZWZlcmVuY2UgVVJJPSIjYmZmbm9mamZpa2Vnb2xua2dvcGNmYW1tcGRoamFoaHBhb2psYWZkaCI+PGRzOlRyYW5zZm9ybXM+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNlbnZlbG9wZWQtc2lnbmF0dXJlIi8+PGRzOlRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyI+PGVjOkluY2x1c2l2ZU5hbWVzcGFjZXMgUHJlZml4TGlzdD0ieHMiIHhtbG5zOmVjPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biMiLz48L2RzOlRyYW5zZm9ybT48L2RzOlRyYW5zZm9ybXM+PGRzOkRpZ2VzdE1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNzaGExIi8+PGRzOkRpZ2VzdFZhbHVlPlFQVG9yQjNsMXo5Q2JpblF5bTRvc2pxTlhzST08L2RzOkRpZ2VzdFZhbHVlPjwvZHM6UmVmZXJlbmNlPjwvZHM6U2lnbmVkSW5mbz48ZHM6U2lnbmF0dXJlVmFsdWU+UXV6aCt4cFNWMzRxVkdwMkxqQUJCWHF0aFZhTzZvSW1HVFNYMy9ZTEdROXM2cXUrbjNXeis1WmNtMDR0a1pwSjZOcUw3dkhlazV2NzJtUkNUUkF1dE9PdWZZUzdSY2hZbnpsSFFZN0NMY01qYW9SSDJZZlBIYlZQN0hxbWx2TElIK29MTitzYnlrZ0tmSzZZeFp2WVlra2x6RGZJQUVnNXBFenBkdjM1aHRjPTwvZHM6U2lnbmF0dXJlVmFsdWU+PGRzOktleUluZm8+PGRzOlg1MDlEYXRhPjxkczpYNTA5Q2VydGlmaWNhdGU+TUlJQ05UQ0NBWjZnQXdJQkFnSUVTMzQzZ2pBTkJna3Foa2lHOXcwQkFRVUZBREJWTVFzd0NRWURWUVFHRXdKVlV6RUxNQWtHQTFVRUNBd0NRMEV4RmpBVUJnTlZCQWNNRFUxdmRXNTBZV2x1SUZacFpYY3hEVEFMQmdOVkJBb01CRmRUVHpJeEVqQVFCZ05WQkFNTUNXeHZZMkZzYUc5emREQWVGdzB4TURBeU1Ua3dOekF5TWpaYUZ3MHpOVEF5TVRNd056QXlNalphTUZVeEN6QUpCZ05WQkFZVEFsVlRNUXN3Q1FZRFZRUUlEQUpEUVRFV01CUUdBMVVFQnd3TlRXOTFiblJoYVc0Z1ZtbGxkekVOTUFzR0ExVUVDZ3dFVjFOUE1qRVNNQkFHQTFVRUF3d0piRzlqWVd4b2IzTjBNSUdmTUEwR0NTcUdTSWIzRFFFQkFRVUFBNEdOQURDQmlRS0JnUUNVcC9vVjF2V2M4L1RrUVNpQXZUb3VzTXpPTTRhc0IyaWx0cjJRS296bmk1YVZGdTgxOE1wT0xaSXI4TE1uVHpXbGxKdnZhQTVSQUFkcGJFQ2IrNDhGamJCZTBoc2VVZE41SHB3dm5IL0RXOFpjY0d2azUzSTZPcnE3aExDdjFaSHR1T0Nva2doei9BVHJoeVBxK1FrdE1mWG5SUzRIcktHSlR6eGFDY1U3T1FJREFRQUJveEl3RURBT0JnTlZIUThCQWY4RUJBTUNCUEF3RFFZSktvWklodmNOQVFFRkJRQURnWUVBVzV3UFI3Y3IxTEFkcStJclI0NGlRbFJHNUlUQ1pYWTloSTBQeWdMUDJySEFOaCtQWWZUbXhidU9ueWtOR3loTTZGakZMYlcydVpIUVRZMWpNclBwcmpPcm15SzVzakpSTzRkMURlR0hUL1luSWpzOUpvZ1JLdjRYSEVDd0x0SVZkQWJJZFdIRXRWWkp5TVNrdGN5eXNGY3Z1aFBRSzhRYy9FL1dxOHVIU0NvPTwvZHM6WDUwOUNlcnRpZmljYXRlPjwvZHM6WDUwOURhdGE+PC9kczpLZXlJbmZvPjwvZHM6U2lnbmF0dXJlPjxzYW1sMjpTdWJqZWN0PjxzYW1sMjpOYW1lSUQgRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoxLjE6bmFtZWlkLWZvcm1hdDplbWFpbEFkZHJlc3MiPkVNUExPWUVFTERBUC9tYW5lZW51c0BjYXJib24uc3VwZXI8L3NhbWwyOk5hbWVJRD48c2FtbDI6U3ViamVjdENvbmZpcm1hdGlvbiBNZXRob2Q9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpjbTpiZWFyZXIiPjxzYW1sMjpTdWJqZWN0Q29uZmlybWF0aW9uRGF0YSBJblJlc3BvbnNlVG89Il84MzMwOTE2ZWU5MDBiNGUwZWQ1YiIgTm90T25PckFmdGVyPSIyMDE4LTA2LTA1VDA3OjAxOjQ5LjkzMVoiIFJlY2lwaWVudD0iaHR0cHM6Ly8xMC4xMzcuMTYuMTE4L2luZGV4Lmh0bWwiLz48L3NhbWwyOlN1YmplY3RDb25maXJtYXRpb24+PC9zYW1sMjpTdWJqZWN0PjxzYW1sMjpDb25kaXRpb25zIE5vdEJlZm9yZT0iMjAxOC0wNi0wNVQwNjo1Njo0OS45MzJaIiBOb3RPbk9yQWZ0ZXI9IjIwMTgtMDYtMDVUMDc6MDE6NDkuOTMxWiI+PHNhbWwyOkF1ZGllbmNlUmVzdHJpY3Rpb24+PHNhbWwyOkF1ZGllbmNlPkFDQ0FMVzwvc2FtbDI6QXVkaWVuY2U+PC9zYW1sMjpBdWRpZW5jZVJlc3RyaWN0aW9uPjwvc2FtbDI6Q29uZGl0aW9ucz48c2FtbDI6QXV0aG5TdGF0ZW1lbnQgQXV0aG5JbnN0YW50PSIyMDE4LTA2LTA1VDA2OjU2OjQ5LjkzMloiIFNlc3Npb25JbmRleD0iOTgxMmNjMjItMjNjMy00Nzg1LTg0MmItMWNkMjgwN2E2NWZmIj48c2FtbDI6QXV0aG5Db250ZXh0PjxzYW1sMjpBdXRobkNvbnRleHRDbGFzc1JlZj51cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YWM6Y2xhc3NlczpQYXNzd29yZDwvc2FtbDI6QXV0aG5Db250ZXh0Q2xhc3NSZWY+PC9zYW1sMjpBdXRobkNvbnRleHQ+PC9zYW1sMjpBdXRoblN0YXRlbWVudD48c2FtbDI6QXR0cmlidXRlU3RhdGVtZW50PjxzYW1sMjpBdHRyaWJ1dGUgTmFtZT0icGluY29kZSIgTmFtZUZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmF0dHJuYW1lLWZvcm1hdDpiYXNpYyI+PHNhbWwyOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhzaTp0eXBlPSJ4czpzdHJpbmciPjAwMDMzMTIyPC9zYW1sMjpBdHRyaWJ1dGVWYWx1ZT48L3NhbWwyOkF0dHJpYnV0ZT48c2FtbDI6QXR0cmlidXRlIE5hbWU9InVzZXJuYW1lIiBOYW1lRm9ybWF0PSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXR0cm5hbWUtZm9ybWF0OmJhc2ljIj48c2FtbDI6QXR0cmlidXRlVmFsdWUgeG1sbnM6eHNpPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeHNpOnR5cGU9InhzOnN0cmluZyI+bWFuZWVudXM8L3NhbWwyOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDI6QXR0cmlidXRlPjxzYW1sMjpBdHRyaWJ1dGUgTmFtZT0ibGFzdG5hbWUiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6YmFzaWMiPjxzYW1sMjpBdHRyaWJ1dGVWYWx1ZSB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIiB4c2k6dHlwZT0ieHM6c3RyaW5nIj5tYW5lZW51czwvc2FtbDI6QXR0cmlidXRlVmFsdWU+PC9zYW1sMjpBdHRyaWJ1dGU+PHNhbWwyOkF0dHJpYnV0ZSBOYW1lPSJmaXJzdG5hbWUiIE5hbWVGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphdHRybmFtZS1mb3JtYXQ6YmFzaWMiPjxzYW1sMjpBdHRyaWJ1dGVWYWx1ZSB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIiB4c2k6dHlwZT0ieHM6c3RyaW5nIj5tYW5lZW51czwvc2FtbDI6QXR0cmlidXRlVmFsdWU+PC9zYW1sMjpBdHRyaWJ1dGU+PC9zYW1sMjpBdHRyaWJ1dGVTdGF0ZW1lbnQ+PC9zYW1sMjpBc3NlcnRpb24+PC9zYW1sMnA6UmVzcG9uc2U+'

    let opt = {
        compact: false,
        spaces: 1,
        ignoreComment: true,
        ignoreCdata: true,
        ignoreDoctype: true,
        ignoreDeclaration: true,
        ignoreAttributes: false
    }

    if (this.isNotEmpty(samlRes.SAMLResponse)) {
        let saml = samlRes.SAMLResponse
        let xml = Base64.decode(saml)
        var result1 = convert.xml2json(xml, opt);
        let obj = JSON.parse(result1)
        let attributeObj = obj.elements[0].elements[3].elements[5]
        let userInfo = {
            pinCode: '',
            userName: '',
            lastName: '',
            firstName: ''
        }
        if (attributeObj.elements[0].attributes.Name == 'pincode') {
            userInfo.pinCode = attributeObj.elements[0].elements[0].elements[0].text
        }
        if (attributeObj.elements[1].attributes.Name == 'username') {
            userInfo.userName = attributeObj.elements[1].elements[0].elements[0].text
        }
        if (attributeObj.elements[2].attributes.Name == 'lastname') {
            userInfo.lastName = attributeObj.elements[2].elements[0].elements[0].text
        }
        if (attributeObj.elements[3].attributes.Name == 'firstname') {
            userInfo.firstName = attributeObj.elements[3].elements[0].elements[0].text
        }

        return userInfo
    } else {
        throw new Error('SAMLResponse is Empty');
    }
}
module.exports.isNotEmpty = function (str) {
    if (str == null || str == undefined || str == '') {
        return false
    }
    return true
}
