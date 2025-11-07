<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'name',
    'description',
    'price',
    'cost',
    'unit',
    'tags',
    'sizes',
    'images',
  ];

  protected $casts = [
    'tags' => 'array',
    'sizes' => 'array',
    'images' => 'array',
  ];
}
