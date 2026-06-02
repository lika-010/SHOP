<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\User;

// class UserController extends Controller
// {
//     // GET ALL USERS (ADMIN)
//     public function index()
//     {
//         return response()->json(User::all());
//     }

//     // GET ONE USER
//     public function show($id)
//     {
//         $user = User::findOrFail($id);

//         return response()->json($user);
//     }

//     // UPDATE USER
//     public function update(Request $request, $id)
//     {
//         $user = User::findOrFail($id);

//         $validated = $request->validate([
//             'name' => 'sometimes|string|max:255',
//             'email' => 'sometimes|email|unique:users,email,' . $id,
//             'role' => 'sometimes|in:user,admin',
//             'phone' => 'nullable|string|max:20',
//             'address' => 'nullable|string|max:255',
//         ]);

//         $user->update($validated);

//         return response()->json([
//             'message' => 'User updated successfully',
//             'user' => $user
//         ]);
//     }

//     // DELETE USER
//     public function destroy($id)
//     {
//         $user = User::findOrFail($id);

//         $user->delete();

//         return response()->json([
//             'message' => 'User deleted successfully'
//         ]);
//     }
// }