package com.hotel.Lakesidehotel.service;

import com.hotel.Lakesidehotel.models.Role;
import com.hotel.Lakesidehotel.models.User;
import com.hotel.Lakesidehotel.repository.RoleRepository;
import com.hotel.Lakesidehotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService{
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Override
    public List<Role> getRoles() {
        return List.of();
    }

    @Override
    public Role createRole(Role therole) {
        String roleName = "ROLE" + therole.getName().toUpperCase();
        Role role = new Role(roleName);
        if(roleRepository.existsByName(role)){
            throw new RuntimeException("roll already exist!");
        }
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long roleId) {
        this.removeAllUsersFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if(role.isPresent() && role.get().getUsers().contains(user.get())){
            role.get().removeUserFromRoles(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        throw new RuntimeException("User not found!");
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);

        if(user.isPresent() && user.get().getRoles().contains(role.get())){
            throw new RuntimeException("user already in this role!");
        }

        if(role.isPresent()){
            role.get().assignRoleToUser(user.get());
            roleRepository.save(role.get());
        }
        return user.get();
    }

    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Optional<Role> role = roleRepository.findById(roleId);
        role.get().removeAllUsersFromRole();
        return roleRepository.save(role.get());
    }
}
