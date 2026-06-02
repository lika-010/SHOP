<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // GET ALL USERS (ADMIN)
    public function index()
    {
        return User::all();
    }

    // GET ONE USER
    public function show($id)
    {
        return User::findOrFail($id);
    }

    // UPDATE USER
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update($request->all());

        return response()->json($user);
    }

    // DELETE USER
    public function destroy($id)
    {
        User::destroy($id);

        return response()->json(['message' => 'User deleted']);
    }
}