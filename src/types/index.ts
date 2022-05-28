export interface IOption {
    title: String,
    price: Number,
    isChecked: Boolean
}

export interface ISelectItem {
    title: String,
    price: Number,
    isSelected: Boolean
}

export interface ISelect {
    title: String,
    items: ISelectItem[]
}

export interface IVariant {
    title: String,
    description: String,
    color: String,
    options: IOption[],
    select: ISelect[]
    price: Number,
    isSelected: Boolean
}

export interface IStep {
    title: String,
    variants: IVariant,
    isDone: Boolean
}