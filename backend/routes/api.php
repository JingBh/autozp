<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post("invite/verify", "InviteController@verify");

Route::post("login", "UserController@login");
Route::any("logout", "UserController@logout");
Route::get("login/validateCode", "UserController@validateCode");
Route::get("login/token", "UserController@getToken");

Route::get("user/info", "UserController@userInfo");
Route::get("user/score", "UserController@userScore");
Route::get("user/photo", "UserController@photo");
Route::get("user/rank", "UserController@rank");
Route::get("user/records", "UserController@records");
Route::get("user/templates", "UserController@templates");
