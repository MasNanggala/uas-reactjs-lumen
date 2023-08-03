import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const BukuList = () => {

    const [state, UpdateState] = useState({
        listBuku: [],
        textSearch: '',
        search: '',
        sort: '',
        isasc: true,
        page:1,
        size:5,
        totalPage:0,
        totalRows:0

    })
    const { listBuku, textSearch, search, sort, page, size, isasc, totalPage, totalRows } = state;

    const navigate = useNavigate();

    const setState = data => {
        UpdateState(current => ({ ...current, ...data }))
    }


    const loadData = () => {
        const _sort = sort == '' ? 'id' : sort;
        axios.get('http://localhost:8000/api/buku', { params: { search, sort: _sort, isasc, page, size } }).then(res => {
            const {data, totalPage, totalRows} =  res.data;
            setState({ listBuku: data,totalPage, totalRows });
        }).catch(error => {
            console.log('Error', error)
        })
    }

    useEffect(() => {
        loadData()
    }, [search, sort, isasc, page, size])

    const onAddNewClick = () => {
        navigate('new/id');
    }

    const onViewClick = id => () => {
        navigate('view/' + id);
    }

    const onEditClick = id => () => {
        navigate('edit/' + id);
    }

    // const onDeleteClick = id => () => {
    //     const yakin = window.confirm('Apakah kamu yakin?')
    //     if (yakin) {
    //         axios.delete('http://localhost:8000/api/buku/' + id).then(res => {
    //             if (res.data.status = 201) {
    //                 alert('Hapus data berhasil!');
    //                 loadData();
    //             }
    //         })
    //     }
    // }


    const onDeleteClick = id => () => {
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Kamu tidak bisa mengembalikan data jika menghapusnya!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:8000/api/buku/' + id).then(res => {
                if (res.data.status = 201) {
                    loadData();
                }
            })
              Swal.fire(
                'Terhapus!',
                'Data telah dihapus.',
                'success'
              )
            }
          })
    }

    const onSearchChange = _ => {
        setState({ textSearch: _.target.value });
    }

    const onSearchClick = () => {
        setState({page : 1, search: textSearch});
    }

    const onResetClick = () => {
        setState({ search: '', textSearch: '', page: 1 })
    }

    const onSort = field => () => {
        const _isasc = sort == field ? !isasc : true;
        setState({ sort: field, isasc: _isasc });
    }

    const onPaging = p => () => {
        if (p<1 || p>totalPage) return;
        setState({page: p})
    }

    const onSizeChange = _ =>{
        setState({size: _.target.value, page: 1})
    }

    const onSearchEnter = _ => {
        if(_.code == 'Enter'){
            setState({search: textSearch})
        }
    }


    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Nang's Library</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Buku</li>
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
                        <h3 className="card-title">Daftar Buku</h3>
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
                                <label htmlFor="" className="control-label">Search</label>
                            </div>
                            <div className="col-3">
                                <input value={textSearch} onChange={onSearchChange} onKeyDown={onSearchEnter} type="text" className="form-control" />
                            </div>
                            <div className="col-2">
                                {
                                    search != '' && (<button onClick={onResetClick} className="btn text-danger mr-2">
                                        <i className="fa fa-times"></i> Reset
                                    </button>)
                                }
                                <button onClick={onSearchClick} className="btn btn-primary">
                                    <i className="fa fa-search"></i>Search
                                </button>
                            </div>
                            <div className="col-5" style={{ textAlign: 'right' }}>
                                <button onClick={onAddNewClick} className="btn btn-primary">
                                    <i className="fa fa-plus"></i> Tambah Baru
                                </button>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div onClick={onSort('id')}>ID Buku {sort == 'id' && (<i className="material-icons">arrow_{isasc ? 'down' : 'up'}ward</i>)}</div>
                                            </th>
                                            <th> <div onClick={onSort('nama_buku')}>Nama Buku {sort == 'nama_buku' && (<i className="material-icons">arrow_{isasc ? 'down' : 'up'}ward</i>)}</div></th>
                                            <th> <div onClick={onSort('tahun_buku')}>Tahun Buku {sort == 'tahun_buku' && (<i className="material-icons">arrow_{isasc ? 'down' : 'up'}ward</i>)}</div></th>
                                            <th> <div onClick={onSort('pengarang')}>Pengarang Buku {sort == 'pengarang' && (<i className="material-icons">arrow_{isasc ? 'down' : 'up'}ward</i>)}</div></th>
                                            <th> <div onClick={onSort('desc_buku')}>Deskripsi Buku {sort == 'desc_buku' && (<i className="material-icons">arrow_{isasc ? 'down' : 'up'}ward</i>)}</div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listBuku.map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.nama_buku}</td>
                                                    <td>{item.tahun_buku}</td>
                                                    <td>{item.pengarang}</td>
                                                    <td>{item.desc_buku}</td>
                                                    <td>
                                                        <button onClick={onViewClick(item.id)} className="btn btn-sm text-primary">
                                                            <i className="fa fa-search"></i>
                                                        </button>
                                                        <button onClick={onEditClick(item.id)} className="btn btn-sm text-success">
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button onClick={onDeleteClick(item.id)} className="btn btn-sm text-danger">
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <hr />
                        <div className="row mt-3">
                            <div className="col-6">
                                Showing {(page*size-size+1)} to { (page*size) < totalRows ? (page*size) : totalRows} of {totalRows} rows
                            </div>
                            <div className="col-6">
                                <div className="text-right">
                                    <span>Page Size</span>
                                    <div className="d-inline-block mr-3 ml-3" style={{ width: 70 }}>
                                        <select onChange={onSizeChange} className="form-control">
                                            {
                                                [5, 10, 25, 50, 100].map(item => (<option key={item} value={item}>{item}</option>))
                                            }
                                        </select>
                                    </div>
                                    <div className="d-inline-block mr-2">Page {page} of {totalPage}</div>
                                    <button onClick={onPaging(1)} className="btn btn-sm">
                                        <i className="material-icons">first_page</i>
                                    </button>
                                    <button onClick={onPaging(page-1)} className="btn btn-sm">
                                        <i className="material-icons">navigate_before</i>
                                    </button>
                                    <button onClick={onPaging(page+1)} className="btn btn-sm">
                                        <i className="material-icons">navigate_next</i>
                                    </button>
                                    <button onClick={onPaging(totalPage)}className="btn btn-sm">
                                        <i className="material-icons">last_page</i>
                                    </button>
                                </div>
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

export default BukuList
