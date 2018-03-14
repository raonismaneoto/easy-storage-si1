package com.ufcg.si1.model.DTO;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.ufcg.si1.model.Category;
import com.ufcg.si1.model.Product;
import com.ufcg.si1.model.enumerations.DiscountType;
import com.ufcg.si1.model.enumerations.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;

import exceptions.NonExistentObjectException;


public class ProductDTO {


	private String barCode;
	
	private String name;

	private BigDecimal price;

	private String producer;

	private String category;
	
    public Status status; 
    
	public DiscountType discountType;

	public int quantity;
	

	public ProductDTO() {
		this.price = new BigDecimal(0);
		this.status = Status.UNAVAILABLE;
		this.discountType = DiscountType.NO_DISCOUNT;
		this.quantity = 0;
	}


	public ProductDTO(String name, String barCode, String producer,
			String categoryName) {
		this.name = name;
		this.price = new BigDecimal(0);
		this.barCode = barCode;
		this.producer = producer;
		this.category = categoryName;
    }
    
    public ProductDTO(Product product, Category category) {
        this.name = product.getName();
		this.price = product.getPrice();
		this.barCode = product.getBarCode();
		this.producer = product.getProducer();
		this.category = category.getName();
        this.status = product.getStatus();
		this.discountType = category.getDiscountType();
		this.quantity = product.getQuantity();

    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getProducer() {
		return producer;
	}

	public void setProducer(String producer) {
		this.producer = producer;
	}

	public String getBarCode() {
		return barCode;
	}

	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
		
	public void setStatus(Status status) {
		this.status = status;
	}

	public int getStatusCode() {
		return status.getStatusCode();
	}

    public Status getStatus() {
		return this.status;
    }
    
    public DiscountType getDiscountType() {
        return this.discountType;
    }   

    public void setDiscountType(DiscountType discount) {
        this.discountType = discount;
	}
	
	public double getDiscountMultiplyer() {
		return this.discountType.getDiscountMultiplier();
	}

	public int getQuantity() {
		return this.quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}
