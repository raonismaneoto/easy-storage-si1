package com.ufcg.si1.service;

import java.util.List;

import com.ufcg.si1.model.Product;

public interface ProductService {

	List<Product> findAllProducts();

	Product findProduct(String barCode);
	
	Product saveProduct(Product product);

	boolean productAlreadyExists(String barCode);
}
