package com.ufcg.si1.service;

import com.ufcg.si1.model.Sale;
import java.util.List;

public interface SaleService {

    Sale saveSale(Sale sale);

    Sale getSale(long id);

    List<Sale> getSales();

    void deleteSale(long id);
}