package com.ufcg.si1.model;

import com.ufcg.si1.model.enumerations.DiscountType;

import java.util.Objects;

import exceptions.NonExistentObjectException;

public class Category {

    private DiscountType discountType;
    private String name;

    public Category(double discountType , String name) throws NonExistentObjectException {
        this.name = name;
        this.discountType = DiscountType.NO_DISCOUNT;
    }


    public double getPriceMultiplier() {
        return  discountType.getDiscountMultiplier();
    }


    public DiscountType getDiscountType() {
        return discountType;
    }

    public void setDiscountType(DiscountType discountType) {
        this.discountType = discountType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Category)) return false;
        Category category = (Category) o;
        return getDiscountType() == category.getDiscountType() &&
                Objects.equals(getName(), category.getName());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getDiscountType(), getName());
    }


}
