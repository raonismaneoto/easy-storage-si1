package com.ufcg.si1.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Sale {
    
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    
    @OneToMany
    private List<Product> products;

    private int itemsQuantity;

    private double totalPrice;

    public Sale() {
        this.id = 0;
    }

    public Sale(List<Product> products, int itemsQuantity, double totalPrice, long id) {
        this.products = products;
        this.itemsQuantity = itemsQuantity;
        this.totalPrice = totalPrice;
        this.id = id;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Product> getProducts() {
        return this.products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public int getItemsQuantity() {
        return this.itemsQuantity;
    }

    public void setItemsQuantity(int quantity) {
        this.itemsQuantity = quantity;
    }

    public double getTotalPrice() {
        return this.totalPrice;
    }
    
    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}