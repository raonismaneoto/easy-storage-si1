package com.ufcg.si1.model.enumerations;

import exceptions.NonExistentObjectException;

public enum DiscountType {
        NO_DISCOUNT(1.0),
        GOOD_DISCOUNT(0.9),
        GREAT_DISCOUNT(0.75),
        SUPER_DISCOUNT(0.5);

        private final double discountMultiplier;

        DiscountType(double discountMultiplier) {
            this.discountMultiplier = discountMultiplier;
        }

        public double getDiscountMultiplier() {
            return this.discountMultiplier;
        }


        
        public static DiscountType getByDiscountMultiplier(double discountMultiplier) throws NonExistentObjectException {
            for (DiscountType discountType : DiscountType.values()) {
                if (discountType.getDiscountMultiplier() == discountMultiplier) {
                    return discountType;
                }
            }
            throw new NonExistentObjectException("Invalid Discount Type");
        }
}
