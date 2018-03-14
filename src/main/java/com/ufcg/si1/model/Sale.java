package com.ufcg.si1.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.hibernate.annotations.ManyToAny;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;

import java.util.List;

@Entity
public class Sale {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "saleId", unique = true, nullable = false)
    private long saleId;
    
    @ManyToMany
    private List<Product> products;

    @ManyToMany(cascade=CascadeType.ALL)
    private List<ProductQuantityPair> productsQuantity;

    private int itemsQuantity;

    private double totalPrice;

    public Sale() {
        this.saleId = 0;
    }

    public Sale(List<Product> products, int itemsQuantity, double totalPrice, long id, List<ProductQuantityPair> productsQuantity) {
        this.products = products;
        this.itemsQuantity = itemsQuantity;
        this.totalPrice = totalPrice;
        this.saleId = id;
        this.productsQuantity = productsQuantity;
    }

    public long getId() {
        return this.saleId;
    }

    public void setId(long id) {
        this.saleId = id;
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

    public List<ProductQuantityPair> getProductsQuantity() {
        return this.productsQuantity;
    }

    public void setProductsQuantity(List<ProductQuantityPair> productsQuantity) {
        this.productsQuantity = productsQuantity;
    }
}