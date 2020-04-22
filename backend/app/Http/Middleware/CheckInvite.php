<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use JingBh\AutoZP\InviteCode;

class CheckInvite
{
    /**
     * 检查是否有正确的邀请码
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (InviteCode::isValid()) {
            return $next($request);
        } else return response()->json([
            "success" => false,
            "message" => "邀请码无效。",
            "redirect" => "invite"
        ]);
    }
}
