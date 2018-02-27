package com.ufcg.si1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.ufcg.si1.model.Batch;
import com.ufcg.si1.model.Product;
import com.ufcg.si1.model.DTO.BatchDTO;
import com.ufcg.si1.model.enumerations.Status;
import com.ufcg.si1.service.ProductBatchService;
import com.ufcg.si1.service.ProductBatchServiceImpl;
import com.ufcg.si1.util.CustomErrorType;

@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {

	@Autowired
	ProductBatchService productBatchService = new ProductBatchServiceImpl();

	@RequestMapping(value = "/findAll", method = RequestMethod.GET)
	public ResponseEntity<List<Product>> listAllProducts() {
		List<Product> products = productBatchService.findAllProducts();
		if (products.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Product>>(products, HttpStatus.OK);
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<Product> createProduct(@RequestBody Product product, UriComponentsBuilder ucBuilder) {
		if (productBatchService.productAlreadyExists(product.getBarCode())) {
			return new ResponseEntity(new CustomErrorType("Problem with Product creation"), HttpStatus.CONFLICT);
		}
		product = productBatchService.saveProduct(product);
		return new ResponseEntity<Product>(product, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/update/{barCode}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateProduct(@PathVariable("barCode") String barCode, @RequestBody Product product) {
		if (!productBatchService.productAlreadyExists(barCode)) {
			return new ResponseEntity(new CustomErrorType("Problem with Product update"), HttpStatus.CONFLICT);
		}
		product = productBatchService.saveProduct(product);
		return new ResponseEntity<Product>(product, HttpStatus.OK);
	}

	@RequestMapping(value = "/batch/create/{barCode}", method = RequestMethod.POST)
	public ResponseEntity<BatchDTO> createBatch(@PathVariable("barCode") String barCode, @RequestBody BatchDTO batchDTO) {
		Product product = productBatchService.findProductByBarCode(barCode);
		if (product == null) {
			return new ResponseEntity(new CustomErrorType("Unable to create batch. Product not found."),
					HttpStatus.NOT_FOUND);
		}
		productBatchService.saveBatch(new Batch(product, batchDTO.getNumberOfItems(), batchDTO.getExpirationDate()));
		return new ResponseEntity<BatchDTO>(batchDTO, HttpStatus.CREATED);
	}
}
