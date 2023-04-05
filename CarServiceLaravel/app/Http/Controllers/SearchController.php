<?php

namespace App\Http\Controllers;

use App\Models\Carros;
use App\Models\Defeitos;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $modelo = $request->route('modelo');

        try {
            $result = Carros::where('MODELO', 'LIKE', '%' . $modelo . '%')->orWhere('FABRICANTE', 'LIKE', '%' . $modelo . '%')->get();
            if ($result->count() > 0) {
                return response()->json($result);
            } else {
                return null;
            }
        } catch (QueryException $e) {
            return response()->json(['message' => 'Ocorreu um erro na execução da consulta'], 500);
        }
    }

    public function listCar($page)
    {
        try {
            $carros = DB::table('carros')->paginate(7, ['*'], 'page', $page);
            if (Carros::count() > 0) {
                return response()->json($carros);
            } else {
                return null;
            }
        } catch (QueryException $e) {
            return response()->json(['message' => 'Ocorreu um erro na execução da consulta'], 500);
        }
    }

    public function delCar($id)
    {
        try {
            Defeitos::where('ID_CARRO', $id)->delete();
            Carros::where('ID', $id)->delete();
        } catch (QueryException $e) {
            return response()->json(['message' => 'Ocorreu um erro na execução da consulta'], 500);
        }
    }

    public function updCar(Request $request, $id)
    {
        $received = $request->json()->all()['update'];

        if ($received['modelo'] != null) {
            $modelo = $received['modelo'];
            try {
                DB::statement("UPDATE carros SET MODELO = '$modelo' WHERE ID = $id");
            } catch (QueryException $e) {
                return $e;
            }
        }

        if ($received['fabricante'] != null) {
            $fabricante = $received['fabricante'];
            try {
                DB::statement("UPDATE carros SET FABRICANTE = '$fabricante' WHERE ID = $id");
            } catch (QueryException $e) {
                return $e;
            }
        }

        if ($received['ano'] != null) {
            $ano = $received['ano'];
            try {
                DB::statement("UPDATE carros SET ANO = '$ano' WHERE ID = $id");
            } catch (QueryException $e) {
                return $e;
            }
        }

        if ($received['preco'] != null) {
            $preco = $received['preco'];
            try {
                DB::statement("UPDATE carros SET PRECO = '$preco' WHERE ID = $id");
            } catch (QueryException $e) {
                return $e;
            }
        }
    }

    public function addCar(Request $request)
    {
        $received = $request->json()->all()['dataNew'];
        $modelo = $received['modelo'];
        $fabricante = $received['fabricante'];
        $ano = $received['ano'];
        $preco = $received['preco'];

        $carroNew = Carros::create([
            'MODELO' => $modelo,
            'FABRICANTE' => $fabricante,
            'ANO' => $ano,
            'PRECO' => $preco
        ]);
    }
}
