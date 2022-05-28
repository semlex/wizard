import { defineStore } from 'pinia'
import data from './data.json'

export const useWizardStore = defineStore('wizard', {
    state: () => ({
        steps: data.map(step => ({
            ...step,
            variants: step.variants.map(({ price_default, ...variant}) => ({
                ...variant,
                options: variant.options.map(option => ({
                    ...option,
                    isChecked: false
                })),
                select: variant.select.map(option => ({
                    title: option.title,
                    items: option.items.map(item => ({
                        ...item,
                        isSelected: false
                    }))
                })),
                price: price_default,
                isSelected: false
            })),
            isDone: false
        })),
        currentStep: 0,
        maxSteps: data.length,
        totalPrice: 0
    }),
    getters: {
        getSteps: (state) => state.steps,
        getCurrentStep: (state) => state.currentStep,
        getTotalPrice: (state) => state.totalPrice
    },
    actions: {
        toggleOption(stepNum: number, variantNum: number, optionNum: number) {
            const variant = this.steps[stepNum].variants[variantNum]
            const option = variant.options[optionNum]

            option.isChecked = !option.isChecked

            if (variant.isSelected) {
                this.totalPrice -= variant.price
            }

            if (option.isChecked) {
                variant.price += option.price
            } else {
                variant.price -= option.price
            }

            if (variant.isSelected) {
                this.totalPrice += variant.price
            }
        },
        changeSelect(stepNum: number, variantNum: number, selectNum: number, itemNum: number) {
            const variant = this.steps[stepNum].variants[variantNum]

            const activeItem = variant.select[selectNum].items.find(item => item.isSelected)
            const selectableItem = variant.select[selectNum].items[itemNum]

            if (variant.isSelected) {
                this.totalPrice -= variant.price
            }

            if (activeItem) {
                variant.price -= activeItem.price
                activeItem.isSelected = false
            }

            selectableItem.isSelected = true
            variant.price += selectableItem.price

            if (variant.isSelected) {
                this.totalPrice += variant.price
            }
        },
        selectVariant(stepNum: number, variantNum: number) {
            const step = this.steps[stepNum]
            const selectedVariant = step.variants.find(variant => variant.isSelected)
            const variant = step.variants[variantNum]

            const isSelectable = variant.select.length === 0 ||
                variant.select.every(variant => variant.items.some(item => item.isSelected))

            if (isSelectable) {
                if (selectedVariant) {
                    selectedVariant.isSelected = false
                    this.totalPrice -= selectedVariant.price
                }

                variant.isSelected = true
                this.totalPrice += variant.price

                if (!step.isDone)  {
                    step.isDone = true
                    if (this.currentStep !== this.maxSteps - 1) {
                        this.currentStep += 1
                    }
                }
            }
        },
        setCurrentStep(stepNum: number) {
            const stepToCome = this.steps[stepNum]
            const activeStep = this.steps[this.currentStep]

            if (stepToCome.isDone) {
                this.currentStep = stepNum
            } else if (activeStep.isDone) {
                this.currentStep = stepNum
            }
        }
    }
})