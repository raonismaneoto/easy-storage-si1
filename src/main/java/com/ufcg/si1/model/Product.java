package com.ufcg.si1.model;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.ufcg.si1.model.enumerations.Status;

@Entity
public class Product {

	@Id
	private String barCode;
	
	private String name;

	private BigDecimal price;

	private String producer;

	private String category;
	
	public Status status;

	private int quantity;

	public Product() {
		this.price = new BigDecimal(0);
		this.quantity = 0;
	}

	public Product(long id, String name, String barCode, String producer,
			String categoryName) {
		this.name = name;
		this.price = new BigDecimal(0);
		this.barCode = barCode;
		this.producer = producer;
		this.category = categoryName;
		this.status = Status.UNAVAILABLE;
		this.quantity = 0;
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

	public int getQuantity() {
		return this.quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((producer == null) ? 0 : producer.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Product other = (Product) obj;
		if (producer == null) {
			if (other.producer != null)
				return false;
		} else if (!producer.equals(other.producer))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
}
