<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// auth APIs
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
Route::get('user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// task APIs
Route::apiResource('tasks', TaskController::class)->middleware('auth:sanctum');
