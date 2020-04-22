<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JingBh\AutoZP\InviteCode;

class InviteController extends Controller
{
    public function verify(Request $request) {
        $code = $request->post("code");
        $valid = InviteCode::isValid($code);
        if ($valid === true) InviteCode::saveToCookie($code);
        return response()->json($valid);
    }
}
