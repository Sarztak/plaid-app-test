type frequency = 
    | Monthly
    | BiWeekly
    | Weekly

type income_source = {
    name: string;
    amount: float;
    frequency: frequency;
}

type payment_method =
    | Cash
    | Card

type essential_expense = {
    name: string;
    amount: float;
    payment_method: payment_method; (* do I need payment method?*)
}

type debt_class = 
    | Revolving
    | Amortizing

type date = Date (* Need to formalize completely *)

(* Fixed obligations *)
type debt = {
    name: string;
    balance: float;
    apr: float;
    minimum_payment: float;
    term_remaining: int;
    debt_class: debt_class;
    residence_secured: bool; (* these fields have no meaning for now*)
    client_payoff_date: date option;
}


type cliff_obligation = {
    name: string;
    amount: float;
    deadline: date;
}

type employer_match = {
    match_rate: float;
    match_cap_pct: float; (* first N% of salary *)
    annual_salary: float;
}

type emergency_fund = {
    current_balance: float;
    monthtly_expenses: float;
    target_months: float;
}

type card = {
    name: string;
    statement_balance: float;
    previous_statement_balance: float;
    last_payment: float;
    last_payment_date: date;
    due_date: date;
    apr: float;
}

type non_discretionary_obligation =
    | DebtMinimum of debt
    | CliffObligation of cliff_obligation
    | EmergencyFund of emergency_fund
    | EmployerMatch of employer_match
    | EmergencyFundStarter of emergency_fund
    | GracePreservation of card
    | HighInterestDebt of debt
    | FullEmergencyFund of emergency_fund


