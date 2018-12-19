import { DateTimeOffset } from '../base/DateTimeOffset'

export interface IUpdateable {
    UpdatedOn?: DateTimeOffset, 
    DeletedOn?: DateTimeOffset, 
    CreatedOn?: DateTimeOffset 
}