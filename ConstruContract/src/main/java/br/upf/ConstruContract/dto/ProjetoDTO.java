package br.upf.ConstruContract.dto;

import java.util.List;

public class ProjetoDTO {

    private String nome;
    private Double valor;
    private List<byte[]> imagens;

    public String getNome() {
        return nome;
    }

    public Double getValor() {
        return valor;
    }

    public List<byte[]> getImagens() {
        return imagens;
    }
}
