<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Str;

class UserController extends Controller
{
    
    

    public function login(Request $request){
       
    	$credentials = $request->only('email','password');


        if(Auth::attempt($credentials)){
             
            $token = Str::random(80);
         	Auth::user()->api_token = $token;
         	Auth::user()->save();
         	return response()->json(['token'=>$token],203);

        }

        return response()->json(['status'=>'Email or Password is wrong'],403);
    }
}
