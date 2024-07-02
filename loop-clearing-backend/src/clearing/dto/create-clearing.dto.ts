export class CreateClearingDto {
    id: number;
    user_id: number;
    total_cleared_amount?: number;
    flow?: boolean;
    transactions?: object[];
    future_transactions?: object[];
}
