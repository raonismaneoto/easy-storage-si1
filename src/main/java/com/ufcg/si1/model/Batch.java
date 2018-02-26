package com.ufcg.si1.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Batch {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@OneToOne
	private Product product;
	
	private int numberOfItens;
	
	private String expirationDate;

	public Batch() {
		this.id = 0;
	}

	public Batch(Product product, int numberOfItens, String expirationDate) {
		super();
		this.product = product;
		this.numberOfItens = numberOfItens;
		this.expirationDate = expirationDate;
	}

	public Batch(long id, Product product, int numberOfItens, String expirationDate) {
		this.id = id;
		this.product = product;
		this.numberOfItens = numberOfItens;
		this.expirationDate = expirationDate;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getNumberOfItens() {
		return numberOfItens;
	}

	public void setNumberOfItens(int numberOfItens) {
		this.numberOfItens = numberOfItens;
	}

	public String getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}

	@Override
	public String toString() {
		return "Batch{" + "id=" + id + ", product=" + product.toString() + ", numberOfItens=" + numberOfItens
				+ ", expirationDate='" + expirationDate + '\'' + '}';
	}
}
