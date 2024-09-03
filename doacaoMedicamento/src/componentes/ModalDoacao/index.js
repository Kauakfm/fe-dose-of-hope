import { RedoOutlined } from "@mui/icons-material";
import React from "react";

export default function ModalDoacoes(props){
    return (
        <div className="modal fade" id={`modal${props.e.codigo}`} tabIndex="-1" aria-labelledby={`modalLabel${props.e.codigo}`} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-body">
              <h1><b>Lista de doações</b></h1>
              <h3>{props.e.nome}</h3><br />
              {props.e.doacao.map((t, index) => (
                <div key={`doacao${index}`}>    
                  <b>Doou {t.nome}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}