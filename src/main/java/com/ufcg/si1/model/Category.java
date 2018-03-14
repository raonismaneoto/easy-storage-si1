package com.ufcg.si1.model;

import com.ufcg.si1.model.DTO.ProductDTO;
import com.ufcg.si1.model.enumerations.DiscountType;

import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import exceptions.NonExistentObjectException;

@Entity
public class Category {

    private DiscountType discountType;

    @Id
    private String name;


    public Category() {
    }

    public Category(ProductDTO product) {
        this.name = product.getCategory();
        this.discountType = product.getDiscountType();
    }

   



    public double getPriceMultiplier() {
        return  discountType.getDiscountMultiplier();
    }


    public DiscountType getDiscountType() {
        return discountType;
    }

    public void setDiscountType(DiscountType discountType) throws NonExistentObjectException {
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
