<?php

use App\Http\Controllers\DefectController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// USUARIO
Route::get('/search/{modelo}', [SearchController::class, 'search']);
Route::get('/defect/{modelo}', [DefectController::class, 'defect']);

// ADM/CAR
Route::get('/adm/cars/{page}', [SearchController::class, 'listCar']);
Route::delete('/adm/cars/{id}', [SearchController::class, 'delCar']);
Route::put('/adm/cars/{id}', [SearchController::class, 'updCar']);
Route::post('/adm/cars', [SearchController::class, 'addCar']);

// ADM/DEFECT
Route::get('/adm/defect/search/{def}', [DefectController::class, 'search']);
Route::get('/adm/defect/{page}', [DefectController::class, 'getDef']);
Route::delete('/adm/def/del/{id}', [DefectController::class, 'delDef']);
Route::get('/adm/busca/cars/unique', [DefectController::class, 'getModel']);
Route::post('/adm/new/def', [DefectController::class, 'newDef']);