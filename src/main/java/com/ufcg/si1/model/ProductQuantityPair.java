package com.ufcg.si1.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProductQuantityPair {

    private String barCode;
    private int quantity;
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pid", unique = true, nullable = false)
    private long pid;

    public ProductQuantityPair() {
        this.pid = 0;
    }

    public ProductQuantityPair(String barCode, int quantity) {
        this.barCode = barCode;
        this.quantity = quantity;
    }

    public String getBarCode() {
        return this.barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public long getId() {
        return this.pid;
    }

    public void setId(int id) {
        this.pid = id;
    }
}