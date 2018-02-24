package com.ufcg.si1.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import com.ufcg.si1.model.Product;
import org.springframework.stereotype.Service;

@Service("productService")
public class ProductServiceImpl implements ProductService {

	private static final AtomicLong counter = new AtomicLong();

	private static List<Product> products;

	static {
		products = populateDummyProdutos();
	}

	private static List<Product> populateDummyProdutos() {
		List<Product> products = new ArrayList<Product>();

		products.add(new Product(counter.incrementAndGet(), "Leite Integral", "87654321-B", "Parmalat", "Mercearia"));
		products.add(new Product(counter.incrementAndGet(), "Arroz Integral", "87654322-B", "Tio Joao", "Perecíveis"));
		products.add(new Product(counter.incrementAndGet(), "Sabao em Po", "87654323-B", "OMO", "Limpeza"));
		products.add(new Product(counter.incrementAndGet(), "Agua Sanitaria", "87654324-C", "Dragao", "limpesa"));
		products.add(new Product(counter.incrementAndGet(), "Creme Dental", "87654325-C", "Colgate", "HIGIENE"));

		return products;
	}

	public List<Product> findAllProducts() {
		return products;
	}

	public void saveProduct(Product product) {
		product.setId(counter.incrementAndGet());
		products.add(product);
	}

	public void updateProduct(Product product) {
		int index = products.indexOf(product);
		products.set(index, product);
	}

	public void deleteProductById(long id) {
		for (Iterator<Product> iterator = products.iterator(); iterator.hasNext();) {
			Product product = iterator.next();
			if (product.getId() == id) {
				iterator.remove();
			}
		}
	}

	public Product findById(long id) {
		for (Product product : products) {
			if (product.getId() == id) {
				return product;
			}
		}
		return null;
	}

	public boolean doesProductExists(Product productToCheck) {
		for (Product product : products) {
			String barCode = product.getBarCode();
			if (barCode.equals(productToCheck.getBarCode())) {
				return true;
			}
		}
		return false;
	}
}
