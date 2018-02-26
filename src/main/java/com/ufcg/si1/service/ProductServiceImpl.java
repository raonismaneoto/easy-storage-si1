package com.ufcg.si1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufcg.si1.dataBaseOperations.DataBaseOperations;
import com.ufcg.si1.model.Product;

@Service("productService")
public class ProductServiceImpl implements ProductService {

	@Autowired
	private DataBaseOperations dataBaseOperations;
	
	@Override
	public List<Product> findAllProducts() {
		return dataBaseOperations.findAllProducts();
	}

	@Override
	public Product findProduct(String barCode) {
		return dataBaseOperations.findProduct(barCode);
	}
	
	@Override
	public Product saveProduct(Product product) {
		return dataBaseOperations.saveProduct(product);
	}

	@Override
	public boolean productAlreadyExists(String barCode) {
		Product product = dataBaseOperations.findProduct(barCode);
		return product != null;
	}
	
}
