package com.ufcg.si1.controller;

import java.util.List;

import com.ufcg.si1.model.enumerations.Status;
import com.ufcg.si1.model.Batch;
import com.ufcg.si1.model.Product;
import com.ufcg.si1.model.DTO.BatchDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import com.ufcg.si1.service.BatchService;
import com.ufcg.si1.service.BatchServiceImpl;
import com.ufcg.si1.service.ProductService;
import com.ufcg.si1.service.ProductServiceImpl;
import com.ufcg.si1.util.CustomErrorType;

import exceptions.ObjetoInvalidoException;
import com.ufcg.si1.dataBaseOperations.DataBaseOperations;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class RestApiController {

	@Autowired
    private DataBaseOperations dataBaseOperations;
	BatchService batchService = new BatchServiceImpl();
	ProductService productService = new ProductServiceImpl();

	@RequestMapping(value = "/product/", method = RequestMethod.GET)
	public ResponseEntity<List<Product>> listAllProducts() {
		List<Product> products = productService.findAllProducts();

		if (products.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
	}

	@RequestMapping(value = "/product/", method = RequestMethod.POST)
	public ResponseEntity<?> createProduct(@RequestBody Product product, UriComponentsBuilder ucBuilder) {
		if (productService.doesProductExists(product)) {
			return new ResponseEntity(new CustomErrorType("O produto " + product.getName() + " do fabricante "
					+ product.getProducer() + " ja esta cadastrado!"), HttpStatus.CONFLICT);
		}

		Product productToReturn = dataBaseOperations.saveProduct(product);

		productToReturn.setStatus(Status.UNAVAILABLE);

		return new ResponseEntity<Product>(productToReturn, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/product/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> searchProduct(@PathVariable("id") long id) {
		Product product = productService.findById(id);
		if (product == null) {
			return new ResponseEntity(new CustomErrorType("Product with id " + id + " not found"),
					HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Product>(product, HttpStatus.OK);
	}

	@RequestMapping(value = "/product/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateProduct(@PathVariable("id") long id, @RequestBody Product product) {
		Product currentProduct = productService.findById(id);
		if (currentProduct == null) {
			return new ResponseEntity(new CustomErrorType("Unable to update. Product with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}

		currentProduct.setName(product.getName());
		currentProduct.setPrice(product.getPrice());
		currentProduct.setBarCode(product.getBarCode());
		currentProduct.setProducer(product.getProducer());
		currentProduct.setCategory(product.getCategory());
		
		productService.updateProduct(currentProduct);

		return new ResponseEntity<Product>(currentProduct, HttpStatus.OK);
	}

	@RequestMapping(value = "/product/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteProduct(@PathVariable("id") long id) {
		Product product = productService.findById(id);

		if (product == null) {
			return new ResponseEntity(new CustomErrorType("Unable to delete. Product with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}
		
		productService.deleteProductById(id);
		
		return new ResponseEntity<Product>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(value = "/product/{id}/batch", method = RequestMethod.POST)
	public ResponseEntity<?> createBatch(@PathVariable("id") long productId, @RequestBody BatchDTO batchDTO) {
		Product product = productService.findById(productId);

		if (product == null) {
			return new ResponseEntity(
					new CustomErrorType("Unable to create batch. Product with id " + productId + " not found."),
					HttpStatus.NOT_FOUND);
		}

		Batch batch = batchService.saveBatch(new Batch(product, batchDTO.getNumberOfItens(), batchDTO.getExpirationDate()));

		if (batch.getNumberOfItens() > 0) {
			product.setStatus(Status.AVAILABLE);
			productService.updateProduct(product);
		}

		return new ResponseEntity<>(batch, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/batch/", method = RequestMethod.GET)
	public ResponseEntity<List<Batch>> listAllLotess() {
		List<Batch> batchs = batchService.findAllBatchs();

		if (batchs.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<List<Batch>>(batchs, HttpStatus.OK);
	}
}
