import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const listJnsBuku = [
    "IT",
    "IPA",
    "IPS",
    "Matematika"
];

const BukuDetail = () => {

    const [state, UpdateState] = useState({ buku: {
        id: '',
        nama_buku: '',
        tahun_buku: '',
        pengarang: '',
        jns_buku: '',
        desc_buku: ''
    }})
    const navigate = useNavigate()

    const { mode, id} = useParams();

    const setState = data => {
        UpdateState(current => ({...current, ...data}))
    }

    useEffect(()=>{
        if (mode != 'new'){
            axios.get('http://localhost:8000/api/buku/' + id).then(res=>{
                setState({buku: res.data})
            })
        }
    }, [])

    const onCancleClick = () => {
        navigate(-1);
    }

    const onInputChange = field => ({target}) => {
        if(mode=='view')return;
        buku[field] = target.value;
        setState(buku)
    }

    const onSaveClick = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Data berhasil disimpan',
            showConfirmButton: false,
            timer: 1500
          })

        if (mode == 'new'){
            axios.post('http://localhost:8000/api/buku', buku).then(res => {
                if (res.data.status=201){
                    // alert('Save data berhasil!');
                    navigate(-1);
                }
            })
        } else if (mode == 'edit'){
            axios.put('http://localhost:8000/api/buku/' + id, buku).then(res => {
                if (res.data.status=201){
                    // alert('Save data berhasil!');
                    navigate(-1);
                }
            })
        }
    }

    const { buku } = state;

    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Buku</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Buku Detail</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                {/* Default box */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Buku Detail</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus" />
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                <i className="fas fa-times" />
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                            <div className="row mt-3">
                                <div className="col-2">
                                    <label htmlFor="" className="control-label">Nama Buku</label>
                                </div>
                                <div className="col-4">
                                    <input onChange={onInputChange('nama_buku')} value={buku.nama_buku} type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-2">
                                    <label htmlFor="" className="control-label">Tahun Buku</label>
                                </div>
                                <div className="col-1">
                                    <input onChange={onInputChange('tahun_buku')} value={buku.tahun_buku} type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-2">
                                    <label htmlFor="" className="control-label">Pengarang Buku</label>
                                </div>
                                <div className="col-4">
                                    <input onChange={onInputChange('pengarang')} value={buku.pengarang} type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-2">
                                    <label htmlFor="" className="control-label">Jenis Buku</label>
                                </div>
                                <div className="col-1">
                                    <select onChange={onInputChange('jns_buku')} value={buku.jns_buku} type="text" className="form-control" >
                                        {
                                            listJnsBuku.map(item => (<option key={item} value={item}>{item}</option>))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-2">
                                    <label htmlFor="" className="control-label">Deskripsi Buku</label>
                                </div>
                                <div className="col-4">
                                    <input onChange={onInputChange('desc_buku')} value={buku.desc_buku} type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-2">
                                    
                                </div>
                                <div className="col-4" style={{textAlign:"right"}}>
                                    <button className="btn btn-default mr-3" onClick={onCancleClick}>
                                        <i className="fa fa-times"></i> Cancel
                                    </button>
                                   {
                                    (mode=='new' || mode=='edit') && (
                                        <button className="btn btn-primary" onClick={onSaveClick}>
                                        <i className="fa fa-save"></i> Save
                                    </button>
                                    )
                                   }
                                </div>
                            </div>
                        </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        Footer
                    </div>
                    {/* /.card-footer*/}
                </div>
                {/* /.card */}
            </section>
            {/* /.content */}
        </div>
    )
}

export default BukuDetail
