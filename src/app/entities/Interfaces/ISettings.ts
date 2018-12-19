import { Branch } from '../framework/owner/Branch'
import { BranchUnit } from '../framework/owner/BranchUnit'
import { Layout } from '../framework/owner/Layout'
import { Depot } from '../stock/Depot'
import { Device } from '../framework/common/Device'
import { Vat } from '../stock/Vat'
import { Pricelist } from '../stock/Pricelist'
import { SecurityRules } from '../index'

export interface ISettings {
    branch?: Branch;
    depot?: Depot;
    receiptPrint?: boolean;
    customerDisplay?: BranchUnit,
    customerDisplayChangeText:string,
    customerDisplayTotalText:string,
    cashRegister?: BranchUnit,
    cashRegisterPrintTemplate: Layout,
    additionalPrinter?: BranchUnit,
    additionalPrinterPrintTemplate: Layout,
    useNetworkDeviceService: boolean,
    deviceServiceEndpoint: string,
    products?: {
        displayMode?: number,
        viewCards?: number,
        fromPricelist?: boolean,
        pricelist?: Pricelist,
        pricelistId?: string
    },
    securityRules:  Array<{ rule: SecurityRules,title:string, value: boolean }>

}