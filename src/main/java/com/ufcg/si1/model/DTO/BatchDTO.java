package com.ufcg.si1.model.DTO;

public class BatchDTO {

    private int numberOfItens;
    private String expirationDate;

    public BatchDTO() {}

    public BatchDTO(int numberOfItens, String expirationDate) {
        super();
        this.numberOfItens = numberOfItens;
        this.expirationDate = expirationDate;
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
}
