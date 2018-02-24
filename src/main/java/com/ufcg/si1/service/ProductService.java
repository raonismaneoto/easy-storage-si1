package com.ufcg.si1.service;

import java.util.List;

import com.ufcg.si1.model.Product;

public interface ProductService {

	List<Product> findAllProducts();

	Product findById(long id);

	void saveProduct(Product product);

	void updateProduct(Product product);

	void deleteProductById(long id);

	boolean doesProductExists(Product product);
}
