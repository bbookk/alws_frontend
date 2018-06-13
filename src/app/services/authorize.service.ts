import { Injectable } from '@angular/core';


@Injectable()
export class AuthorizeService {

    private mstObjmenu = [
        { name: 'login', id: '000', visible: false },
        { name: 'sumDaily', id: '001', visible: false },
        { name: 'sumMonthly', id: '002', visible: false },
        { name: 'sumSuper', id: '003', visible: false },
        { name: 'sumOrg', id: '004', visible: false },
        { name: 'apprReport', id: '005', visible: false },
        { name: 'sumAdjReport', id: '006', visible: false },
        { name: 'ctrlBatch', id: '007', visible: false },
        { name: 'accOrgPath', id: '008', visible: false },
        { name: 'specialDay', id: '009', visible: false },
        { name: 'sysConf', id: '010', visible: false },
        { name: 'userRole', id: '011', visible: false },
        { name: 'welfare', id: '012', visible: false },
        { name: 'keyword', id: '013', visible: false },
        { name: 'userDetail', id: '014', visible: false },
        { name: 'maxOT', id: '015', visible: false },
        { name: 'otSapReport', id: '016', visible: false }
    ]

    private mstMenuTop = [
        { name: 'report', id: '01', visible: false, subMenu: '001|002|003|004|005|006' },
        { name: 'engine', id: '02', visible: false, subMenu: '007' },
        { name: 'setup', id: '03', visible: false, subMenu: '008|009|010|011|012|013|014|015|016' }
    ]

    private mainMenu = {
        report: '01',
        engine: '02',
        setup: '03'
    }

    private menu =
        {
            login: '000',
            sumDaily: '001',
            sumMonthly: '002',
            sumSuper: '003',
            sumOrg: '004',
            apprReport: '005',
            sumAdjReport: '006',
            ctrlBatch: '007',
            accOrgPath: '008',
            specialDay: '009',
            sysConf: '010',
            userRole: '011',
            welfare: '012',
            keyword: '013',
            userDetail: '014',
            maxOT: '015',
            otSapReport: '016'
        }


    setPermission(listRole) {
        if (isNotEmpty(listRole)) {
            console.log('is permission')
            listRole.forEach(e => {
                for (let i = 0; i < this.mstObjmenu.length; i++) {
                    if (this.mstObjmenu[i].id == e.id) {
                        this.mstObjmenu[i].visible = true
                        break
                    }
                }
            });
            hiddenMenuWithoutSubMenu(this.mstMenuTop, listRole)
        } else {  // case by pass when  undefine

            console.log('bypass permission')
            this.mstObjmenu.forEach(e => {
                e.visible = true
            })
            this.mstMenuTop.forEach(e => {
                e.visible = true
            })
        }
    }

    checkPermission(menuid) {
        for (let i = 0; i < this.mstObjmenu.length; i++) {
            if (this.mstObjmenu[i].id == menuid) {
                return !this.mstObjmenu[i].visible
            }
        }
    }

    checkPermissionMain(menuid) {
        for (let i = 0; i < this.mstMenuTop.length; i++) {
            if (this.mstMenuTop[i].id == menuid) {
                return !this.mstMenuTop[i].visible
            }
        }
    }

    getMenu() {
        return this.menu
    }

    getMainMenu() {
        return this.mainMenu
    }



}

function isNotEmpty(str) {
    if (str == null || str == undefined || str == '') {
        return false
    }
    return true
}

function hiddenMenuWithoutSubMenu(menu, listRole) {
    menu.forEach(mainMenu => {
        let menuIdList = mainMenu.subMenu.split('|');
        menuIdList.forEach(menuId => {
            listRole.forEach(e => {
                if (menuId == e.id) {
                    mainMenu.visible = true
                }
            })

        })

    })
    console.log('main menu :', menu)
}
