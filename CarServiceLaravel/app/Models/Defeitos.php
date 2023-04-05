<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Defeitos extends Model
{
    protected $table = 'defeitos';
    protected $fillable = ['ID_CARRO', 'DESCRICAO_DEFEITO'];
    public $timestamps = false;
    use HasFactory;
}
