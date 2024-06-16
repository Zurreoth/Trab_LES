package br.upf.ConstruContract.dto;

import br.upf.ConstruContract.model.Contratante;
import br.upf.ConstruContract.model.Projeto;
import br.upf.ConstruContract.model.Vendedor;

import java.util.Date;
import java.util.List;

public class ContratoDTO {
    private Date dataEmissao;
    private Double valor;
    private Integer status;
    private Contratante contratante;
    private Vendedor vendedor;
    private List<Projeto> projetos;

    public Date getDataEmissao() {
        return dataEmissao;
    }

    public Double getValor() {
        return valor;
    }

    public Integer getStatus() {
        return status;
    }

    public Contratante getContratante() {
        return contratante;
    }

    public Vendedor getVendedor() {
        return vendedor;
    }

    public List<Projeto> getProjetos() {
        return projetos;
    }
}
