<?php

namespace App\Http\Controllers;

use App\Models\Carros;
use App\Models\Defeitos;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPSTORM_META\map;

class DefectController extends Controller
{
    public function defect(Request $request)
    {
        $defect = $request->route('modelo');

        $result = Defeitos::where('ID_CARRO', '=', $defect)->get();

        return response()->json($result);
    }

    public function search(Request $request)
    {
        $def =  $request->route('def');
        try {
            $result = Defeitos::join('carros', 'carros.ID', '=', 'defeitos.ID_CARRO')
                ->where('DESCRICAO_DEFEITO', 'LIKE', '%' . $def . '%')
                ->orWhere('MODELO', 'LIKE', '%' . $def . '%')
                ->orWhere('FABRICANTE', 'LIKE', '%' . $def . '%')
                ->get(['defeitos.ID', 'carros.MODELO', 'carros.FABRICANTE', 'defeitos.DESCRICAO_DEFEITO']);

            if ($result->count() > 0) {
                return response()->json($result);
            } else {
                return null;
            }
        } catch (QueryException $e) {
            return response()->json(['message' => 'Ocorreu um erro na execução da consulta'], 500);
        }
    }

    public function getDef($page)
    {
        try {
            $defects = Defeitos::join('carros', 'defeitos.ID_CARRO', '=', 'carros.id')
                ->select('defeitos.ID', 'defeitos.ID_CARRO', 'carros.MODELO', 'defeitos.DESCRICAO_DEFEITO')
                ->paginate(10, ['*'], 'page', $page);
            if ($defects->count() > 0) {
                return response()->json($defects);
            } else {
                return null;
            }
        } catch (QueryException $e) {
            return response()->json(['message' => 'Ocorreu um erro na execução da consulta'], 500);
        }
    }

    public function delDef($id)
    {
        try {
            Defeitos::where('ID', $id)->delete();
        } catch (QueryException $e) {
            return response()->json(['message' => 'Ocorreu um erro na execução da consulta'], 500);
        }
    }

    public function getModel()
    {
        try {
            // $carrosUnique = Carros::distinct('modelo')->pluck('modelo');
            $carrosUnique = Carros::select('id', 'modelo')->distinct('modelo')->get();
            $formatado = [];
            foreach ($carrosUnique as $modelo) {
                $formatado[] = [
                    'value' => [
                        'id' => $modelo->id,
                        'modelo' => $modelo->modelo,
                    ],
                    'label' => $modelo->modelo,
                ];
            };
            return response()->json($formatado);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Ocorreu um erro na execução da consulta'.$e], 500);
        }
    }

    public function newDef(Request $request)
    {
        $received = $request->json()->all()['dataNew'];
        
        $idCarro = $received['carro']['id'];
        $defeito = $received['defeito'];

        $defeitoNew = Defeitos::create([
            'ID_CARRO' => $idCarro,
            'DESCRICAO_DEFEITO' => $defeito
        ]);
    }
}
