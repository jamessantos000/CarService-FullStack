<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carros extends Model
{
    protected $table = 'carros';
    protected $fillable = ['MODELO', 'FABRICANTE', 'ANO', 'PRECO'];
    public $timestamps = false;
    use HasFactory;
}